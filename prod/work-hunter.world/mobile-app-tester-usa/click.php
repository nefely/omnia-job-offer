<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/javascript');
$clickid = "optional";
if(isset($_GET['key']) || isset($_GET['uclick'])) {
    $url = "https://track.work-hunter.world/track.php?{$_SERVER['QUERY_STRING']}";
    $headers = get_headers($url, 1);
    $domain = parse_url(is_array($headers['Location'])?$headers['Location'][0]:$headers['Location'], PHP_URL_HOST);
    if($domain != null) {
        parse_url(is_array($headers['Location'])?$headers['Location'][0]:$headers['Location'], PHP_URL_HOST);
        $query_str = parse_url(is_array($headers['Location'])?$headers['Location'][0]:$headers['Location'], PHP_URL_QUERY);
        parse_str($query_str, $query_params);
        $response = array('domain' => $domain) + $query_params;
        $clickid = isset($response['clickid']) ? $response['clickid'] : $response['s2'];
    }
}
print_r("var clickid = '{$clickid}'");
die();