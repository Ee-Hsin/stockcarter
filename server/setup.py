from setuptools import setup, find_packages

setup(
    name='stockcarter-backend',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'fastapi',
        'uvicorn[standard]',
        'pymongo'
    ],
    entry_points={
        'console_scripts': [
            'runapp=main:start'
        ]
    }
)
