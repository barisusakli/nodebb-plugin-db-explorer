<div class="row">
	<div class="col-md-3">
		<form class="form">
			<div class="mb-3">
				<label class="form-label">Key</label>
				<input id="keyName" type="text" class="form-control" placeholder="Key Name">
			</div>
			<button class="btn btn-primary" id="get">Get</button>
			<p class="form-text">Following inputs apply to sorted sets and are optional</p>
			<div class="mb-3">
				<label class="form-label">Start</label>
				<input id="start" type="text" class="form-control" placeholder="Optional">
			</div>
			<div class="mb-3">
				<label class="form-label">Stop</label>
				<input id="stop" type="text" class="form-control" placeholder="Optional">
			</div>
			<div class="mb-3">
				<label class="form-label">Min</label>
				<input id="min" type="text" class="form-control" placeholder="Optional">
			</div>
			<div class="mb-3">
				<label class="form-label">Max</label>
				<input id="max" type="text" class="form-control" placeholder="Optional">
			</div>
			<div class="form-check">
				<input id="withScores" type="checkbox" class="form-check-input" checked>
				<label class="form-check-label">With Scores</label>
			</div>
			<div class="form-check">
				<input id="count" type="checkbox" class="form-check-input">
				<label class="form-check-label">Count</label>
			</div>
		</form>

	</div>
	<div class="col-md-9 results">
		<div class="template hidden">
			Key: <strong><span id="key"></span></strong>
			Type: <strong><span id="type">{result.type}</span></strong>
			<pre class="output" style="max-height: 600px; overflow: auto; white-space: break-spaces;">{result.value}</pre>
		</div>
	</div>
</div>
