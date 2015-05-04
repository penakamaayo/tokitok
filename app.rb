require 'sinatra/base'
require 'haml'

module ChatDemo
  class App < Sinatra::Base
    get '/' do
      haml :index
    end

    get '/bimby' do
      haml :bimby
    end

  end
end
