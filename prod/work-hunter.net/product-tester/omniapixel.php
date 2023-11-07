<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/javascript');

$CampaignKey = 'eu55s9x513j14qby9xzs';
$url = "https://track.work-hunter.net/track.php?key=".$CampaignKey;
$headers = @get_headers($url, 1);

$domain = @parse_url(@$headers['Location'], PHP_URL_HOST);
$data = new ArrayObject();

if($domain != null && isset($headers['Location'])) {
    @parse_url(@$headers['Location'], PHP_URL_HOST);
    $query_str = @parse_url($headers['Location'], PHP_URL_QUERY);
    @parse_str($query_str, $query_params);
	$data = json_encode($query_params);
}

@$omniaPixelData = json_encode($data);

print_r("console.log('OmniPixel: {$omniaPixelData}')");
die();
