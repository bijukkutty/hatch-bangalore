<?php
function testapi($response) {
  $data = [];
  return $response->withJson($data)->withHeader('Content-type', 'application/json')->withStatus(201);
  // echo "This is a test API";
}