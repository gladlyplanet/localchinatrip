$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

$UserAgent = "LocalChinaTravelSite/1.0 ly13845267281@sina.com"
$Api = "https://commons.wikimedia.org/w/api.php"

$items = @(
  @{ name = "experience-beiji-village"; query = "Beiji Village Mohe Heilongjiang"; out = "public/images/experience-beiji-village.jpg" },
  @{ name = "experience-guoliang-village"; query = "Guoliang Village Henan"; out = "public/images/experience-guoliang-village.jpg" },
  @{ name = "experience-yuanyang-terraces"; query = "Yuanyang rice terraces Hani"; out = "public/images/experience-yuanyang-terraces.jpg" },
  @{ name = "experience-longji-terraces"; query = "Longji rice terraces Guangxi"; out = "public/images/experience-longji-terraces.jpg" },

  @{ name = "experience-chengdu-food"; query = "Chengdu Sichuan food street"; out = "public/images/experience-chengdu-food.jpg" },
  @{ name = "experience-changsha-food"; query = "Changsha Hunan food street"; out = "public/images/experience-changsha-food.jpg" },
  @{ name = "experience-kaifeng-night-market"; query = "Kaifeng night market"; out = "public/images/experience-kaifeng-night-market.jpg" },
  @{ name = "experience-guangzhou-food"; query = "Guangzhou Cantonese food street"; out = "public/images/experience-guangzhou-food.jpg" },

  @{ name = "experience-kunming-market"; query = "Kunming market Yunnan"; out = "public/images/experience-kunming-market.jpg" },
  @{ name = "experience-kashgar-bazaar"; query = "Kashgar bazaar"; out = "public/images/experience-kashgar-bazaar.jpg" },
  @{ name = "experience-shanghai-market"; query = "Shanghai wet market"; out = "public/images/experience-shanghai-market.jpg" },
  @{ name = "experience-guangzhou-market"; query = "Guangzhou wet market"; out = "public/images/experience-guangzhou-market.jpg" },

  @{ name = "experience-dali-lijiang-road"; query = "Dali Lijiang Yunnan old town road"; out = "public/images/experience-dali-lijiang-road.jpg" },
  @{ name = "experience-western-sichuan-road"; query = "Western Sichuan road Kangding Danba"; out = "public/images/experience-western-sichuan-road.jpg" },
  @{ name = "experience-ili-grassland"; query = "Ili grassland Xinjiang"; out = "public/images/experience-ili-grassland.jpg" },
  @{ name = "experience-qinghai-gansu-road"; query = "Qinghai Lake Zhangye road"; out = "public/images/experience-qinghai-gansu-road.jpg" },

  @{ name = "experience-shanghai-lanes"; query = "Shanghai lilong lane"; out = "public/images/experience-shanghai-lanes.jpg" },
  @{ name = "experience-west-lake"; query = "West Lake Hangzhou"; out = "public/images/experience-west-lake.jpg" },
  @{ name = "experience-guangzhou-old-city"; query = "Guangzhou old city arcade"; out = "public/images/experience-guangzhou-old-city.jpg" },
  @{ name = "experience-wuhan-river"; query = "Wuhan Yangtze river East Lake"; out = "public/images/experience-wuhan-river.jpg" }
)

foreach ($item in $items) {
  if (Test-Path $item.out) {
    Write-Output "SKIP $($item.name)"
    continue
  }

  try {
    $uri = $Api + "?action=query&generator=search&gsrsearch=$([uri]::EscapeDataString($item.query))&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&format=json"
    $result = Invoke-RestMethod -Headers @{ "User-Agent" = $UserAgent } -Uri $uri
    $pages = @($result.query.pages.PSObject.Properties.Value)
    $image = $pages | Where-Object { $_.imageinfo -and $_.imageinfo[0].url -match '\.(jpg|jpeg|png)$' } | Select-Object -First 1
    if (-not $image) {
      Write-Output "MISS $($item.name) $($item.query)"
      continue
    }

    $url = $image.imageinfo[0].url
    Invoke-WebRequest -Headers @{ "User-Agent" = $UserAgent } -Uri $url -OutFile $item.out
    Write-Output "OK $($item.name) $url"
  } catch {
    Write-Output "FAIL $($item.name) $($_.Exception.Message)"
  }
}
