FROM ghcr.io/aspect-build/pnpm:v6.7.4 AS base
WORKDIR /build
RUN apt-get update && apt-get install -y curl
RUN curl -L https://linera.io/install.sh | sh
ENV PATH="/root/.local/share/linera/bin:${PATH}"
COPY . .
CMD ["bash", "run.bash"]
