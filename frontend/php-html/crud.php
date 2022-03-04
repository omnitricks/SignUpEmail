<?php  include('../php/server.php'); ?>

<?php 

if(!isset($_SESSION['id'])){
	header('location: LoginRegister.php');
	exit();
}
?>

<?php 
	if (isset($_GET['edit'])) {
		$id = $_GET['edit'];
		$update = true;
		$record = mysqli_query($db, "SELECT * FROM notes WHERE id=$id");

		if (@count($record) == 1 ) {
            $n = mysqli_fetch_array($record);
            $title = $n['title'];
            $notes = $n['notes'];
            $date_time = $n['date_time'];
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
    <title>CRUD: Create, Read, Update, Delete</title>
    <link rel="stylesheet" type="text/css" href="../css/CRUDstyle.css">
</head>
<body>
<?php if (isset($_SESSION['message'])): ?>
	<div class="msg">
		<?php 
			echo $_SESSION['message']; 
			unset($_SESSION['message']);
		?>
	</div>
<?php endif ?>


<?php $results = mysqli_query($db, "SELECT * FROM notes"); ?>
<center>
<table class="sub"> 
        <?php while ($row = mysqli_fetch_array($results)) { ?>
            <tbody>
                <tr>
                    <td><b><?php echo $row['title']; ?></b></td>
                    <td>
                        <b><?php
                            $date = new DateTime($row['date_time']);
                            echo $date->format('m/d/Y');
                        ?></b>
                    </td>
                    <td rowspan="2">
                        <a href="crud.php?edit=<?php echo $row['id']; ?>" class="edit_btn" >
                            <img src="../images/edit_alt.png" class="edit_pic_alt"/>
                            <img src="../images/edit.png" class="edit_pic"/>
                        </a>
                    </td>
                    <td rowspan="2">
                        <a href="../php/server.php?del=<?php echo $row['id']; ?>" class="del_btn">
                            <img src="../images/del_alt.png" class="del_pic_alt"/>
                            <img src="../images/del.png" class="del_pic"/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td><?php echo $row['notes']; ?></td>
                    <td>
                        <?php
                            $date = new DateTime($row['date_time']);
                            echo $date->format("H:i");
                        ?>
                    </td>
                </tr>
        </tbody>
        <?php } ?>
    </table>
</center>
	<form method="post" action="../php/server.php" >
        
		<div class="input-group">
            <input type="hidden" name="id" value="<?php echo $id; ?>">
            <label>Title</label>
			<input type="text" name="title" value="<?php echo $title; ?>">
			<label>Notes</label>
			<textarea rows="5" cols="80" name="notes"><?php echo $notes; ?></textarea>
		</div>
		<div class="input-group">
        <?php if ($update == true): ?>
            <button class="btn-up" type="submit" name="update" >Update</button>
        <?php else: ?>
            <button class="btn-sav" type="submit" name="save" >Save</button>
        <?php endif ?>
		</div>
	</form>
    <a href="Index.php" class="home"><button class="btn-home">Return to Home</button></a>
</body>
</html>