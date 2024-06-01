FROM golang:alpine AS builder

WORKDIR /app

COPY . .

ENV GOPROXY=https://goproxy.io,direct

RUN go mod tidy

RUN go build -v -o hvcore ./cmd/app/...

FROM scratch

WORKDIR /app

COPY --from=builder app/hvcore .

EXPOSE 8080

CMD ["./hvcore"]
