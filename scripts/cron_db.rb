#RAILS_ROOT = Dir.pwd if not defined? RAILS_ROOT

require 'mysql2'
require 'yaml'
require 'active_support'
require 'active_support/core_ext'

class CronLogger
  def initialize(env)
    if env == "development"
      @logger = Logger.new(STDOUT)
      @logger.level = Logger::INFO
    else
      @logger = nil
    end 
  end
  
  def error(message, exception)
    if @logger
      @logger.error("#{message}: #{exception}")
    end
  end
  
  def info(message)
    if @logger
      @logger.info(message)
    end
  end
end

class CronDB
       def initialize(env)
	         @logger = CronLogger.new(env)
	         @env = env
       	   @db = nil
           @conf = nil
	         if env and (@conf = YAML.load_file("web/config/database.yml")[env])
             if Mysql2::Client.const_defined? :FOUND_ROWS
               @conf[:flags] = Mysql2::Client::FOUND_ROWS
             end
             #create mysql2
             puts @conf
             @db = Mysql2::Client.new(@conf.symbolize_keys)
 	         else
		         @logger.error("Your environment is not initialized: #{env if env}", nil)
	         end
       end

       def close
         if @db
	         @db.close
         end
       end

       def ok?
       	   @db != nil
       end

       def conf
           @conf
       end

       def execute(cmd)
           puts cmd
           @db.query(cmd)
       end

       def optimize_tables
       	   tables = @db.query("show tables")
       	   @logger.info tables.count
	         tables.each do |row|
               optimize_query = "optimize table #{row.values.first}"
	             puts optimize_query
	             @db.query(optimize_query)
	         end
       end

       def clean_tokens
       	   result = @db.query("DELETE FROM `user_tokens` WHERE expired_at < NOW() - INTERVAL 1 DAY")
  	       @logger.info "RubyCron: Removed #{@db.affected_rows} tokens"
       end

       protected

       def strip_non_words(string)
         string_encoded = string.force_encoding(Encoding::ASCII_8BIT)
         string_encoded.gsub!(/[^\p{Alnum}\p{Punct}]/, ' ') # non-word characters
         string_reencoded = string_encoded.force_encoding("utf-8")
         string_reencoded #return
       end
       
       def truncate(text, length = 30, truncate_string = "...")
           if text.nil? then return end
           l = length - truncate_string.mb_chars.length
           (text.mb_chars.length > length ? text.mb_chars[0...l] + truncate_string : text).to_s
       end
end