require 'faye/websocket'

module ChatDemo
  class ChatBackend
    KEEPALIVE_TIME = 15

    def initialize app
      @app = app
      @clients = []
    end


    def call env
      if Faye::WebSocket.websocket? env
        ws = Faye::WebSocket.new env, nil, {:ping => KEEPALIVE_TIME}

        # gets invoked when a new connection to the server happens
        ws.on :open do |event|
          p [:open, ws.object_id]
          @clients << ws
        end


        # gets invoked when a ws message is received by the server
        ws.on :message do |event|
          p [:message, event.data]
          @clients.each {|client| client.send(event.data) }
        end

        # gets invoked when the client closes the connection
        ws.on :close do |event|
          p [:close, ws.object_id, event.code, event.reason]
          @clients.delete ws
          ws = nil
        end

        ws.rack_response
      else
        @app.call env
      end
    end
  end
end
