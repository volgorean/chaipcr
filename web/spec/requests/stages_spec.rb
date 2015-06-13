require 'spec_helper'

describe "Stages API" do
  before(:each) do
    @experiment = create_experiment_with_one_stage("test")
  end

  describe "check editable" do
    it "- not editable if experiment definition is not editable" do
      @experiment.experiment_definition = ExperimentDefinition.new(:name=>"diagnostic", :experiment_type=>ExperimentDefinition::TYPE_DIAGONOSTIC)
      @experiment.save
      post "/protocols/#{@experiment.experiment_definition.protocol.id}/stages", {stage:{stage_type:"cycling"}}.to_json, {'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
      response.response_code.should == 422
    end
  end
  
end