# Nodejs web app

Express app with handlebars view engine.

# Using Volumes to Develop Applications in Containers

## Inner Loop of Development

Traditional: Code -> Compile -> Run -> Test

With Docker: Code -> Compile -> Build -> Run -> Test

## Container Image Builds

Complex image definitions can take a significant amount of time to build. This can severely impact the productivity of a software developer.

## Developing Inside a Container

Iterate over the inner loop from inside the container rather than outside.

Access: shell into the container
Source Code: part of the container's filesystem
CLI: run application and tests using the CLI
Ephemeral by nature: changes don't persist on container deletion

## Docker Volumes

Persistent Storage: area of storage located outside container's filesystem
Volume Plugins: implemented using a plugin system for flexibility
Filesystem Mount: storage mounted inside container during its life

One of the Docker Volume Types is Bind Mount that allows to mount an arbitrary directory inside the container and persist the changes on container termination.

Also, to avoid manually shelling into the container and killing the main process (which terminates the container), there needs to be a Hot Reload utility to detect and restart the server.

Therefore the setup is:

- Changes made to source located on the host are reflected in the container via the bind mount volume
- The hot reload utility automatically detects any changes to the source files and restarts the server
- The changes can be tested to check they have implemented the desired behavior.

`docker run --volume /path/on/host:/path/in/container ...`

## File Ownership

Default user for Docker is "root" -> UID=0, GID=0.
Local machines might have different users -> UID=?, GID=?.
The mismatch between the two will cause "Permission Denied" when using Bind Mount Volume and a Hot Reload setup.

A flexible solution involves providing UID and GID as ARG parameters during Build and using these ARG parameters to create a user and a group inside the container.

`docker build --build-arg UID=<USER_ID> --build-arg GID=<GROUP_ID> ...`
