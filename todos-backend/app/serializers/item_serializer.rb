class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity
  belongs_to :todo
  
end
