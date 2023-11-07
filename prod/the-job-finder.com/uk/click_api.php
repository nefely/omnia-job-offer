<?php

    $CampaignKey='csqx8f7dlre7v5pxdrzb';	
    $CampaignLink='https://track.startwork.store/track.php?key='.$CampaignKey;
    $ApiKey='10000013adee86ee9f777ada9fb323e24fccaf3';

    $getClick = new getClick($CampaignLink, $ApiKey);

    class getClick{
	
        /*
        * Binom ClickAPI
        * @version 1.16
        * @date 25.08.2021
        **/
        function __construct($CampaignLink, $ApiKey){
            if(strpos($CampaignLink, '?')!==false){
                $this->ClickURL=$CampaignLink.'&lp_type=click_info&api_key='.$ApiKey;
            }else{
                $this->ClickURL=$CampaignLink.'?lp_type=click_info&api_key='.$ApiKey;
            }
            if(isset($_GET)){
                foreach($_GET AS $key=>$val){
                    $this->ClickURL=$this->ClickURL.'&'.$key.'='.urlencode($val);
                }
            }
            $this->DataClick=$this->getClickData($this->ClickURL);
        }
       function setLPClick(){
            $URL=$this->getLPClickURL();
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $URL);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            $result = curl_exec( $ch );
            curl_close( $ch );
            return true;
        }
        function getLPClickURL($emulation=1){
            if(isset($this->ClickURL) && isset($this->DataClick['uclick'])){
                $tempArr=explode('?',$this->ClickURL);
                if($emulation==1){
                    $LPClickURL=$tempArr[0].'?lp=1&emulation_mode=1&uclick='.$this->DataClick['uclick'];
                }else{
                    $LPClickURL=$tempArr[0].'?lp=1&uclick='.$this->DataClick['uclick'];
                }
                return $LPClickURL;
            }
            return false;
        }
        function getClickData($ClickURL){
            $ClickOptions=$this->getClickOptions();
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $ClickURL);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            if(!empty($ClickOptions)){
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $ClickOptions);
            }
            $result = curl_exec( $ch );
            curl_close( $ch );
            if(strpos($result,'<body><!-- adp-fngr-prnt --><script>')) {
                echo $result; return false;
            }
            if(!$result=json_decode($result,true)){
                $result['status']='error';
                $result['error']='Incorrect Campaign link';
            }
            return $result;
        }
        function getClickOptions(){
            $posts=array();
            if(isset($_POST) && !empty($_POST)){
                foreach($_POST AS $key=>$val){
                    $posts[]=$key.'='.$val;
                }
            }
            $Headers=array();
            foreach($_SERVER AS $key=>$val){
                if(strtolower(substr($key, 0, 5)) === 'http_' || strtolower($key)=='remote_addr') {
                    $Headers[$key]=$val;
                }
            }
            if(!isset($Headers['HTTP_CONTENT_TYPE'])){
                $Headers['HTTP_CONTENT_TYPE']='text/html; charset=utf-8';
            }
            if(!isset($Headers['HTTP_X_FORWARDED_FOR']) && isset($Headers['REMOTE_ADDR'])){
                $Headers['HTTP_X_FORWARDED_FOR']=$Headers['REMOTE_ADDR'];
            }
            $posts[]='ClickDataHeaders='.urlencode(json_encode($Headers));
            return implode('&',$posts);
        }
    }

header('Content-Type: application/javascript');

if(isset($_GET['getclickid'])) {
	$clickid = $getClick->DataClick["clickid"];
 	print_r("var clickid = '{$clickid}';");
}
if(isset($_GET['setlpclick'])) {
	$getClick->setLPClick();
}
if(isset($_GET['getuclick'])) {
	$uclick = $getClick->DataClick["uclick"];
 	print_r("var uclick = '{$uclick}';");
}

?>