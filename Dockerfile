# base image
FROM oven/bun:latest as base
WORKDIR /usr/source
USER bun

# install dependencies and cache them for future builds.
FROM base AS install
WORKDIR /temp/dev
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile

# install dependencies with --production (exclude devDependencies)
WORKDIR /temp/prod
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=test
# todo: add unit test command

# copy production dependencies and source code into final image
FROM base AS production
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/source/src/ ./src/
COPY --from=prerelease /usr/source/package.json .

ENV NODE_ENV=production

EXPOSE 8000/tcp
ENTRYPOINT [ "bun", "run", "start" ]
