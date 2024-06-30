#!/bin/bash

# Check if the virtual environment is activated
if [[ "$VIRTUAL_ENV" == "" ]]
then
    echo "The virtual environment is not activated!"
    echo "Run 'source env/bin/activate' to activate it."
    exit 1
fi

# Continue with your application commands
runapp