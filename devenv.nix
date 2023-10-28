{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  dotenv.enable = false;
  dotenv.disableHint = true;

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.nodejs
    pkgs.bun
  ];

  # https://devenv.sh/scripts/
  scripts.hello.exec = "echo hello from $GREET";


  certificates = [
    "practicing.localhost"
  ];

  services.caddy = {
    enable = true;
    virtualHosts."practicing.localhost".extraConfig = ''
      reverse_proxy :5100
    '';
  };

  languages = {
    javascript.enable = true;
  };

  # https://devenv.sh/languages/
  # languages.nix.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
  processes = {
    next.exec = "bun run dev";
  };
}
