BASENAME = File.basename(Dir.getwd)

USER = "lenni"
HOST = "lenni.info"
PATH = "www/#{BASENAME}"

task :deploy do
    puts "*** Deploying the app ***"
    sh "rsync -r --exclude=.git . #{USER}@#{HOST}:#{PATH}"
end
