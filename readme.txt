Some of my concerns when implementing solution for this problem:
  - Reusability of the program
    - Ability to add more type of sensor without touching a lot of files or the main loop
    - Ability to handle different formats of data
    - Data driven design
  - Performance
    - able to handle large files
    - overflow, presision 
    - skip reading file in some cases if result is already detemined (build a cursor map of item in a log file)