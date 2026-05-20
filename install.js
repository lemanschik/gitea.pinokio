const platform = process.platform
const arch = process.arch

const getBinaryUrl = () => {
  if (platform === 'win32') {
    return "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-windows-4.0-amd64.exe"
  }
  if (platform === 'darwin') {
    if (arch === 'arm64') {
      return "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-darwin-arm64"
    } else {
      return "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-darwin-amd64"
    }
  }
  if (platform === 'linux') {
    if (arch === 'arm64') {
      return "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-linux-arm64"
    } else {
      return "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-linux-amd64"
    }
  }
  return null
}

const binaryUrl = getBinaryUrl()
if (!binaryUrl) {
  throw new Error(`Unsupported platform: ${platform} ${arch}`)
}

const binaryPath = platform === 'win32' ? 'app/gitea.exe' : 'app/gitea'

const runSteps = [
  {
    method: "fs.download",
    params: {
      uri: binaryUrl,
      path: binaryPath
    }
  }
]

if (platform !== 'win32') {
  runSteps.push({
    method: "shell.run",
    params: {
      message: `chmod +x ${binaryPath}`
    }
  })
}

module.exports = {
  run: runSteps
}
