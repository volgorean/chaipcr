object @step
attribute :id, :name, :temperature, :hold_time

node(:errors, :unless => lambda { |obj| obj.errors.empty? }) do |o|
	o.errors
end