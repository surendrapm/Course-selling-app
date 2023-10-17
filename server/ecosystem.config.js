module.exports = {
    apps: [
      {
        name: 'COURSE-SELLING-APP', // Name of your application
        script: 'index.js', // Entry point of your application
        instances: 1, // Number of instances to run (can be increased for load balancing)
        exec_mode: 'fork', // Execution mode ('fork' or 'cluster')
        watch: true, // Enable file watching and auto-restart on file changes
        ignore_watch: ['node_modules', 'logs'], // Directories/files to ignore when watching
        max_memory_restart: '500M', // Maximum memory usage for restart
        log_date_format: 'YYYY-MM-DD HH:mm:ss', // Log date format
        error_file: 'logs/error.log', // Error log file path
        out_file: 'logs/out.log', // Standard output log file path
      },
    ],
  };
  