require "fileutils"

base_dir = ARGV.first

raise "Error" unless base_dir

dir = Dir.open(base_dir)
entry_count = dir.count

base_count = 10
base_count *= 10 while ((entry_count /= 10) != 0)

index = 0
dir.entries.each do |entry|
  next unless entry =~ /\.png$/
  puts "rename #{entry} to nr_#{base_count + index}.png"
  FileUtils.cp entry, "nr_#{base_count + index}.png"
  index += 1
end