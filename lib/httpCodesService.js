class HttpCodes {

  responseOk = {
    object: "OK",
    status: 200,
    data: undefined,
  }

  responseCreated = {
    object: "Created",
    status: 201,
    data: undefined,
  }

  responseNoContent = {
    object: "No Content",
    status: 204,
  }

  responseBadRequest = {
    object: "Bad Request",
    status: 400,
    code: undefined,
    message: undefined,
  };

  responseUnauthorized = {
    object: "Unauthorized",
    status: 401,
    code: undefined,
    message: undefined,
  };

  responseForbidden = {
    object: "Forbidden",
    status: 403,
    code: undefined,
    message: undefined,
  };

  responseNotFound = {
    object: "Not Found",
    status: 404,
    code: undefined,
    message: undefined,
  };

  responseMethodNotAllowed = {
    object: "Method Not Allowed",
    status: 405,
  };

}

module.exports = { HttpCodes };

/*
200 OK
The request succeeded. The result meaning of "success" depends on the HTTP method:

GET: The resource has been fetched and transmitted in the message body.
HEAD: The representation headers are included in the response without any message body.
PUT or POST: The resource describing the result of the action is transmitted in the message body.
TRACE: The message body contains the request message as received by the server.
201 Created
The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.

202 Accepted
The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.

203 Non-Authoritative Information
This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.

204 No Content
There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.

205 Reset Content
Tells the user agent to reset the document which sent this request.
*/

/*
400 Bad Request
The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

401 Unauthorized
Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.

402 Payment Required Experimental
This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.

403 Forbidden
The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.

404 Not Found
The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.

405 Method Not Allowed
The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.

406 Not Acceptable
This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.

407 Proxy Authentication Required
This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.
*/