<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/javascript');

$server_params = @parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);

$campaign_key = '6o2y6olp0vb1vwyegq0c';
$url = "https://track.dreamjobfinder.pro/track.php?key=".$campaign_key."&".$server_params;

$ip = @$_SERVER['HTTP_CLIENT_IP'] ? @$_SERVER['HTTP_CLIENT_IP'] : (@$_SERVER['HTTP_X_FORWARDED_FOR'] ? @$_SERVER['HTTP_X_FORWARDED_FOR'] : @$_SERVER['REMOTE_ADDR']);
$context = stream_context_create([
    'http' => [
        'header' => "X-Forwarded-For: {$ip}",
        'user_agent' => @$_SERVER['HTTP_USER_AGENT']
    ]
]);

$headers = @get_headers($url, 1, $context);

$domain = @parse_url(@$headers['Location'], PHP_URL_HOST);
$data = new ArrayObject();

if($domain != null && isset($headers['Location'])) {
    $query_str = @parse_url($headers['Location'], PHP_URL_QUERY);
    @parse_str($query_str, $query_params);
	$data = ["data" => $query_params, "cookies" => @$headers['Set-Cookie']];
}

@$omnia_pixel_data = json_encode($data);

print_r("const pixelData = {$omnia_pixel_data};");
die();
