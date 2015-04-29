require 'sinatra/base'
require 'haml'

module ChatDemo
  class App < Sinatra::Base
    get '/' do
      haml :index
    end
  end
end
