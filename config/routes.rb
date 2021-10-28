Rails.application.routes.draw do
  root to: "pages#index"
  post "game/leave/json", to: "pages#destroy_room_json"
  post "login/json", to: "pages#login"
  post "register/json", to: "pages#register"
  post "game/new/json", to: "pages#create_room"
  get "game-updates/json", to: "pages#fetch_updates"
  post "game/invites/json", to: "pages#fetch_invites"

  mount ActionCable.server, at: "/cable"
end
