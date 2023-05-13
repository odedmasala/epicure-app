process.on('unhandledRejection', (reason: Error | any) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);
  
    throw new Error(reason.message || reason);
  });