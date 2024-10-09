document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button#launch-button').addEventListener('click', doLaunch)
})

var doLaunch = function() {
  if (!window.protobuf || !window.castv2 || !window.castv2_client) return

  var cc_ip   = document.querySelector('input#cc-ip').value
  var cc_port = document.querySelector('input#cc-port').value

  var tcp_host = document.querySelector('input#tcp-host').value
  var tcp_port = document.querySelector('input#tcp-port').value

  if (!cc_ip || !tcp_host || !tcp_port) return

  if (cc_port)  cc_port  = parseInt(cc_port,  10)
  if (tcp_port) tcp_port = parseInt(tcp_port, 10)

  var cc_options = {
    host: cc_ip,
    port: cc_port
  }

  var tcp_options = {
    hostname: tcp_host,
    port:     tcp_port,
    remote:   {address: cc_ip, family: 'IPv4', port: cc_port},
    api:      false
  }

  window.castv2.setProxy(tcp_options)

  ondeviceup(cc_options)
}

var ondeviceup = function(cc_options) {
  var Client               = window.castv2_client.Client;
  var DefaultMediaReceiver = window.castv2_client.DefaultMediaReceiver;

  var client = new Client();

  client.connect(cc_options, function() {
    console.log('connected, launching app ...');

    client.launch(DefaultMediaReceiver, function(err, player) {
      var media = {

        // Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
        contentId: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
        contentType: 'video/mp4',
        streamType: 'BUFFERED', // or LIVE

        // Title and cover displayed while buffering
        metadata: {
          type: 0,
          metadataType: 0,
          title: "Big Buck Bunny",
          images: [
            { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg' }
          ]
        }
      };

      player.on('status', function(status) {
        console.log('status broadcast playerState=%s', status.playerState);
      });

      console.log('app "%s" launched, loading media %s ...', player.session.displayName, media.contentId);

      player.load(media, { autoplay: true }, function(err, status) {
        console.log('media loaded playerState=%s', status.playerState);

        // Seek to 2 minutes after 15 seconds playing.
        setTimeout(function() {
          player.seek(2*60, function(err, status) {
            //
          });
        }, 15000);
      });
    });
  });

  client.on('error', function(err) {
    console.log('Error: %s', err.message);
    client.close();
  });
}
