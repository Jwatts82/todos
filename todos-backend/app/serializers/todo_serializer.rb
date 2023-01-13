class TodoSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
  has_many :items
end
