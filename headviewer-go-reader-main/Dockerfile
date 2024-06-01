FROM golang:alpine AS builder

WORKDIR /app

COPY . .

ENV GOPROXY=https://goproxy.io,direct

RUN go mod tidy

RUN go build -v -o hvreader ./cmd/app/...

FROM alpine:latest

WORKDIR /app

COPY --from=builder app/hvreader .

EXPOSE 8080

CMD ["./hvreader"]
