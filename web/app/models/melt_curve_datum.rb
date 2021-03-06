#
# Chai PCR - Software platform for Open qPCR and Chai's Real-Time PCR instruments.
# For more information visit http://www.chaibio.com
#
# Copyright 2016 Chai Biotechnologies Inc. <info@chaibio.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
class MeltCurveDatum < ActiveRecord::Base
  belongs_to :experiment

  def self.new_data_generated?(experiment, stage_id)
    lastrow = where(["experiment_id=? AND stage_id=?", experiment.id, stage_id]).order("id DESC").select("temperature").first
    if lastrow
      if experiment.cached_temperature == nil
        return lastrow
      else
        if experiment.running?
          return ((lastrow.temperature - experiment.cached_temperature).abs >= 1)? lastrow : nil
        else #experiment completed
          return (lastrow.temperature != experiment.cached_temperature)? lastrow : nil
        end
      end
    else
      return nil
    end 
  end
end
