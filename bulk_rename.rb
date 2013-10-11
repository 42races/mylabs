require "fileutils"


# works only in the current directory
# copy files to be renamed to a directory and cd to that directory
# specify the pattern of filename and prefix
# run this file

pattern = /\.png$/  # make this nil to rename all the 
# pattern = //      # use nil to rename all the files

dir = Dir.open(".")
entry_count = dir.count
prefix = "nr_"
base_count = 10
base_count *= 10 while ((entry_count /= 10) != 0)

index = 0
dir.entries.each do |entry|
  next if ([".", "..", __FILE__].include? entry) || !(entry =~ pattern)
  # to avoid any type of mistake
  FileUtils.cp entry, "#{prefix}#{base_count + index}.png"
  index += 1
end