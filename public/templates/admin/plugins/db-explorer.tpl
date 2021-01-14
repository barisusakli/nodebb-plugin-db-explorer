<div class="row">
	<div class="col-md-3">
		<form class="form">
			<div class="form-group">
				<label>Key</label>
				<input id="keyName" type="text" class="form-control" placeholder="Key Name" value="{result.key}">
			</div>
			<button class="btn btn-primary" id="get">Get</button>
			<p class="help-block">Following inputs apply to sorted sets and are optional</p>
			<div class="form-group">
				<label>Start</label>
				<input id="start" type="text" class="form-control" placeholder="Optional" value="{result.start}">
			</div>
			<div class="form-group">
				<label>Stop</label>
				<input id="stop" type="text" class="form-control" placeholder="Optional" value="{result.stop}">
			</div>
			<div class="form-group">
				<label>Min</label>
				<input id="min" type="text" class="form-control" placeholder="Optional" value="{result.min}">
			</div>
			<div class="form-group">
				<label>Max</label>
				<input id="max" type="text" class="form-control" placeholder="Optional" value="{result.max}">
			</div>
			<div class="form-group">
				<label>With Scores</label>
				<input id="withScores" type="checkbox" class="form-control" checked>
			</div>
			<div class="form-group">
				<label>Count</label>
				<input id="count" type="checkbox" class="form-control">
			</div>
		</form>

	</div>
	<div class="col-md-9 results">
		<div class="template hidden">
			Key: <strong><span id="key">{result.type}</span></strong>
			Type: <strong><span id="type">{result.type}</span></strong>
			<pre class="output" style="max-height: 600px; overflow: auto; white-space: break-spaces;">{result.value}</pre>
		</div>
	</div>
</div>
