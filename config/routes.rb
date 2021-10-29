Rails.application.routes.draw do
  root to: "pages#index"
  get "api/game-updates", to: "pages#fetch_updates"
  post "api/game/leave", to: "pages#destroy_room_json"
  post "api/login", to: "pages#login"
  post "api/register", to: "pages#register"
  post "api/game/new", to: "pages#create_room"
  post "api/game/invites", to: "pages#fetch_invites"
  get '*path', to: "pages#index"

  mount ActionCable.server, at: "/cable"
end
