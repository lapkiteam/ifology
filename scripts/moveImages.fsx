#!/usr/bin/env -S dotnet fsi
#r "nuget: FSharpMyExt, 2.0.0-prerelease.11"
open System.IO
open FsharpMyExtension

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
[<RequireQualifiedAccess>]
module ImageMagikApi =
    let convert sourcePath outputPath =
        Proc.startProcSimple "magick" (String.concat " " [
            $"\"%s{sourcePath}\""
            $"\"%s{outputPath}\""
        ])

type Image = {
    Png: FileInfo Option
    Clip: FileInfo Option
}

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
[<RequireQualifiedAccess>]
module Image =
    let empty = {
        Png = None
        Clip = None
    }

    let setFile (file: FileInfo) state =
        match file.Extension.ToLower() with
        | ".png" ->
            { state with
                Png = Some file
            }
        | ".clip" ->
            { state with
                Clip = Some file
            }
        | _ -> state

type Images = Image list

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
[<RequireQualifiedAccess>]
module Images =
    let fromDir sourcesDir : Images =
        DirectoryInfo(sourcesDir).EnumerateFiles()
        |> Seq.map (fun file ->
            let fileName =
                Path.GetFileNameWithoutExtension file.Name
            fileName, file
        )
        |> Seq.groupBy fst
        |> Seq.map (fun (_, xs) ->
            xs
            |> Seq.fold
                (fun state (_, file) ->
                    Image.setFile file state
                )
                Image.empty
        )
        |> List.ofSeq

    let move destinationDir (images: Images) =
        let removePngIfHasClip (image: Image) =
            match image with
            | { Clip = Some _; Png = Some pngFile } ->
                printfn $"Delete %s{pngFile.FullName}"
                File.Delete pngFile.FullName
            | _ -> ()

        let convertPngAndMove (image: Image) =
            image.Png
            |> Option.iter (fun file ->
                let dstFileName = Path.ChangeExtension(file.Name, "webp")
                let dstPath = Path.Combine(destinationDir, dstFileName)
                printfn $"Convert %s{file.FullName} to %s{dstPath}"
                ImageMagikApi.convert file.FullName dstPath
                |> ignore
            )

        images
        |> Seq.iter (fun image ->
            convertPngAndMove image
            removePngIfHasClip image
        )

let imageSourcesDir = "src/content/items"
let imageDestinationDir = "public/items"

Images.fromDir imageSourcesDir
|> Images.move imageDestinationDir
|> printfn "%A"
