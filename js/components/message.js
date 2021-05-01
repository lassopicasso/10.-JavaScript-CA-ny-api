function message(messageType = "success", message = "") {
  return `<div class="alert ${messageType}"> 
            <h3>So sorry, something wrong occured.</h3>
            <p>The following error occured - ${message}</p>
            <p>Please try again later.</p>
        </div>`;
}
