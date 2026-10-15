# Recadre et compresse une photo pour le site (JPEG, qualité 80).
# Usage : powershell -File tools/recadrer.ps1 -Source a.jpg -Sortie b -Ratio 1.6 -Largeurs "900,1600"
#         [-Fx 0.5 -Fy 0.5] [-Marge "0,0,0,0"]
# -Marge retire d'abord des bords (gauche, haut, droite, bas, en fractions) : cadres de négatif, textes.
param(
  [string]$Source, [string]$Sortie, [double]$Ratio, [string]$Largeurs,
  [double]$Fx = 0.5, [double]$Fy = 0.5, [string]$Marge = "0,0,0,0"
)
Add-Type -AssemblyName System.Drawing
$m = [double[]]($Marge -split ',')
$img = [System.Drawing.Image]::FromFile((Resolve-Path $Source))
$zoneX = $img.Width * $m[0]; $zoneY = $img.Height * $m[1]
$zoneL = $img.Width * (1 - $m[0] - $m[2]); $zoneH = $img.Height * (1 - $m[1] - $m[3])
if ($zoneL / $zoneH -gt $Ratio) { $cadreH = $zoneH; $cadreL = $cadreH * $Ratio } else { $cadreL = $zoneL; $cadreH = $cadreL / $Ratio }
$cadreX = [Math]::Min([Math]::Max($zoneX + $zoneL * $Fx - $cadreL / 2, $zoneX), $zoneX + $zoneL - $cadreL)
$cadreY = [Math]::Min([Math]::Max($zoneY + $zoneH * $Fy - $cadreH / 2, $zoneY), $zoneY + $zoneH - $cadreH)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 80L
foreach ($largeur in [int[]]($Largeurs -split ',')) {
  $hauteur = [int][Math]::Round($largeur / $Ratio)
  $bmp = New-Object System.Drawing.Bitmap $largeur, $hauteur
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'; $g.SmoothingMode = 'HighQuality'
  $dest = New-Object System.Drawing.RectangleF 0, 0, $largeur, $hauteur
  $src = New-Object System.Drawing.RectangleF $cadreX, $cadreY, $cadreL, $cadreH
  $g.DrawImage($img, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
  $chemin = "$Sortie-$largeur.jpg"
  $bmp.Save($chemin, $codec, $params)
  $g.Dispose(); $bmp.Dispose()
  "{0} {1}x{2} {3:N0} Ko" -f $chemin, $largeur, $hauteur, ((Get-Item $chemin).Length / 1KB)
}
$img.Dispose()
