<?php
if (empty($_POST) && empty($_FILES)) {
	exit("Access Denied");
}

if (isset($_FILES) && !empty($_FILES)) {
	file_storage($_FILES); 
}

if (isset($_POST) && !empty($_POST)) {
	$ret = array("success"=>false, "result" => null);

	$action = array_key_exists("action", $_POST) ? $_POST["action"] : "";

	if (!empty($action))  {
		switch(trim($action)) {
			case 'get_date':
				get_Date($_POST);
				break;
			case 'get_chat':
				$formArr = array_key_exists("form", $_POST) ? $_POST["form"] : "";
				$index = array_key_exists("index", $formArr) ? $formArr["index"] : "";

				$getFile = get_Date($action);

				$chatData = array("status"=>null, "data" => null);
				if (array_key_exists("success", $getFile)
					&& $getFile["success"] = true) {
					$fileName = $getFile["module"]["file"];

					if (!empty($fileName)) {
						$tempData = loadText($fileName, $index);
						if (is_array($tempData)) {
							$chatData["status"] = array_key_exists("status", $tempData) ? $tempData["status"] : "";
							$chatData["data"] = array_key_exists("data", $tempData) ? $tempData["data"] : "";
						}

						if (is_array($chatData["data"]) && is_array($chatData["status"])) {
							$ret["success"] = true;
							$ret["result"] = $chatData;
						}
						
					}
				}

				return print_r(json_encode($ret, JSON_UNESCAPED_UNICODE));
				break;
		}
	}
}

function file_storage($data) {
	$ret = array("success" => false, "result" => null);

	$storagePath = dirname(__FILE__) . "\\file\\";
	$uploadFiles = array();
	if (is_array($data)) {
		$uploadTotal = count($data);
		$uploadCount = 0;
		foreach ($data as $key => $file) {
			$fileNameArr = explode(".", $file["name"]);

			if (is_array($fileNameArr)) {
				$fileName = time().".".$fileNameArr[1];
			}
			if (isset($fileName) && !empty($fileName)) {
				if (move_uploaded_file($file["tmp_name"], $storagePath . $fileName)) {
					$uploadFiles[$key] = $file["name"];

					$uploadCount += 1;
				}
			}
		}

		$ret["result"] = count($uploadFiles) > 0 ? $uploadFiles : null;
	}

	if ((int)$uploadCount == (int)$uploadTotal) {
		$ret["success"] = true;
	}

	return print_r(json_encode($ret));
}

function loadText($file, $index = -1, $dataType = null) {
	$time_start = microtime(true);

	$text = file_get_contents($file);
	$rows = explode("\n", $text);

	$data = array();
	if (is_array($data)) {
		foreach ($rows as $key => $row) {

			if (preg_match("/^\d{4}\/\d{2}\/\d{2}（/", $row)) {
				if (!array_key_exists($row, $data)) {
	    			$data["time"][] = $key;
	    			$data["status"][$key] = array(
	    				"index" => 0,
	     				"date" => $row,
	     				"count" => 0,
	     				"join" => 0,
	     				"quit" => 0
	     				);
	    			$data[$row] = array();
	   			}
	  		}
	 	}

	 	$timeArr = is_array($data["time"]) ? $data["time"] : array();
	 	array_push($timeArr,count($rows) - 1);
	 	foreach ($timeArr as $k2 => $v2) {
	  		$nextKey = $k2 + 1;

	  		if (array_key_exists($nextKey,$timeArr)) {
	  			$tempValue = array();
	    		for($i=$v2+1;$i<$timeArr[$nextKey];$i++){
	    			if (array_key_exists($rows[$v2], $data)) {

	    				//統計每日發言狀態
	    				if (!array_key_exists("status", $data[$rows[$v2]])) {
	    					$data[$rows[$v2]]["status"] = array();
	    				}

	    				$tempValue = preg_split("/\s/", $rows[$i]);
	    				// $tempValue = preg_split("/[\x{4e00}-\x{9fa5}]{2}\d{2}:\d{2}/u", $rows[$i]);
	     				if (!empty($tempValue)) {
	     					$tempData = trim(implode(" ",array_splice($tempValue,1, count($tempValue))));
	     					$tempData = explode(" ", $tempData);

	     					//系統訊息過濾
	     					if (count($tempData) == 1) {
	     						if (preg_match("/加入群組/", $tempData[0])) {
		      						$data["status"][$v2]["join"] +=1;
			     				}

				     			if (preg_match("/已退出群組/", $tempData[0])) {
				      				$data["status"][$v2]["quit"] +=1;
				     			}
	     					} elseif (count($tempData) > 1) {
	     						//發言訊息過濾
	     						if(count($tempData) == 2) {
	     							$author = trim($tempData[0]);
	     							$data[$rows[$v2]]["data"][] = array(
		     							"author" => $author,
		     							"content" => $tempData[1],
		     							"date_t" => $tempValue[0]
		     						);
		     						$data["status"][$v2]["count"] +=1;

		     						//發言訊息統計
		     						if (!array_key_exists($author, $data[$rows[$v2]]["status"])) {
		     							$data[$rows[$v2]]["status"][$author] = 0;
		     						}
		     						$data[$rows[$v2]]["status"][$author] +=1;

	     						} else {
	     							switch (trim($tempData[0])) {
	     								//特殊ID處理
	     								case '蔡孟寰（Joe':
	     								case 'Ricky':
	     								case 'YUN':
	     								case '婠柔':
	     									$data[$rows[$v2]]["data"][] = array(
	     										"author" => $tempData[0]." ".$tempData[1],
			     								"content" => implode("",array_slice($tempData,2)),
			     								"date_t" => $tempValue[0]
			     								);

	     									//發言訊息統計
	     									$author = trim($tempData[0]." ".$tempData[1]);
				     						if (!array_key_exists($author, $data[$rows[$v2]]["status"])) {
				     							$data[$rows[$v2]]["status"][$author] = 0;
				     						}
				     						$data[$rows[$v2]]["status"][$author] +=1;
	     									break;
	     								default:
	     									$data[$rows[$v2]]["data"][] = array(
	     										"author" => $tempData[0],
			     								"content" => count($tempData) > 2 ? implode("",array_slice($tempData,1)) : $tempData[1],
			     								"date_t" => $tempValue[0],
			     								);

	     									//發言訊息統計
	     									$author = trim($tempData[0]);
				     						if (!array_key_exists($author, $data[$rows[$v2]]["status"])) {
				     							$data[$rows[$v2]]["status"][$author] = 0;
				     						}
				     						$data[$rows[$v2]]["status"][$author] +=1;
	     									break;
	     							}
	     							$data["status"][$v2]["count"] +=1;
	     						}	
	     					}
	     				}
	    			} else {
	     				continue;
	    			}
	   			}
	  		}
	 	}
	}

	$chatDay = array();
	if(is_array($data)){
		//chat data index array
		foreach ($data as $key => $value) {
			$chatDay[] = $key;
			
		}


		foreach ($chatDay as $key => $value) {
			if($key == 0 || $key ==1) {
				continue;
			}

			foreach ($data["status"] as $key2 => $value2) {
				if (!is_array($value2)) {
					continue;
				}
				if ($value == $value2["date"]) {
					$data["status"][$key2]["index"] = $key;
				}
				
			}
			
		}
	}
	
	// print_r("發言人數： ".count($data[$chatDay[$index]]["status"]));
	// echo "<br>";
	if ($index > 1 && !empty($dataType)) {
		arsort($data[$chatDay[$index]]["status"]);
		return $data[$chatDay[$index]][$dataType];
	} elseif ($index > 1 && empty($dataType)) {
		arsort($data[$chatDay[$index]]["status"]);
		return $data[$chatDay[$index]];
	} elseif ($index ==0) {
		return $data["time"];
	} elseif ($index ==1) {
		//return $data["status"];
		return $chatDay;
	}
	
	// $time = microtime(true) - $time_start;
	// print_r($time);
}

function get_Date($data = null) {
	$ret = array("success" => false, "result" => null, "module" => null);

	//check file folder
	$folderName = "file";
	$fileName = array();
	if ((boolean)is_dir($folderName)) {
		$files =  array_filter(glob('./'.$folderName.'/*'), 'is_file');
		if (is_array($files) && count($files) > 0) {
			foreach ($files as $key  => $file) {
				if (empty($file)) {
					continue;
				}
				//$tempFile[$key] = explode("/", $file);
				$tempFile = explode("/", $file);
				$fileName[$key] = substr($tempFile[2], 0, -4);
			}

			if (is_array($fileName) && count($fileName) > 0) {
				$fileIndex = max(array_keys($fileName));
				$curFile = $files[$fileIndex];
			}

			if (isset($curFile) && !empty($curFile)) {
				$parseData = loadText($curFile,1);

				unset($parseData[0]);
				unset($parseData[1]);
			}

			if (is_array($parseData) && count($parseData) > 0) {
				$ret["success"] = true;
				$ret["result"] = $parseData;
				$ret["module"] = array(
					"file" => $curFile
					);
			}
		}
		
	}

	if ($data === "get_chat") {
		return $ret;
	}

	return print_r(json_encode($ret, JSON_UNESCAPED_UNICODE));
}

?>