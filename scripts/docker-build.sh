IMAGE_NAME=docker.tangerie.xyz/spacekadets:latest
ARCH_LIST=linux/arm64/v8,linux/amd64

docker buildx build --platform $ARCH_LIST -t $IMAGE_NAME .