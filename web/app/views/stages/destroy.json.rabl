object @stage

node(:errors, :unless => lambda { |obj| obj.errors.empty? }) do |o|
	o.errors
end