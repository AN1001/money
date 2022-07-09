<?php
session_start();
$dbGraphData = $_SESSION['graphData'];
?>
<script type="text/javascript">
    var graphDataRaw = "<?php echo $dbGraphData; ?>";
</script>
