<?php 
	session_start();
	$db = mysqli_connect('localhost', 'root', '', 'crud');

    // initialize variables
    $title = "";
	$notes = "";
	$id = 0;
	$update = false;

	if (isset($_POST['save'])) {
        $title = $_POST['title'];
        $notes = $_POST['notes'];
        $date_time = date_create()->format('Y-m-d H:i:s');

		mysqli_query($db, "INSERT INTO notes (title, notes, date_time) VALUES ('$title', '$notes', '$date_time')"); 
		$_SESSION['message'] = "Address saved"; 
		header('location: ../php-html/crud.php');
	}

    if (isset($_POST['update'])) {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $notes = $_POST['notes'];
        $date_time = date_create()->format('Y-m-d H:i:s');
    
        mysqli_query($db, "UPDATE notes SET title='$title', notes='$notes', date_time='$date_time' WHERE id=$id");
        $_SESSION['message'] = "Address updated!"; 
        header('location: ../php-html/crud.php');
    }

    if (isset($_GET['del'])) {
        $id = $_GET['del'];
        mysqli_query($db, "DELETE FROM notes WHERE id=$id");
        $_SESSION['message'] = "Address deleted!"; 
        header('location: ../php-html/crud.php');
    }