<?php

if (isset($_FILES)) {
	file_storage($_FILES); 
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

?>