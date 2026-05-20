module.exports = {
  run: [
    {
      when: "{{exists('app')}}",
      method: "fs.rm",
      params: {
        path: "app"
      }
    },
    {
      when: "{{exists('data')}}",
      method: "fs.rm",
      params: {
        path: "data"
      }
    },
    {
      when: "{{exists('log')}}",
      method: "fs.rm",
      params: {
        path: "log"
      }
    },
    {
      when: "{{exists('custom')}}",
      method: "fs.rm",
      params: {
        path: "custom"
      }
    }
  ]
}
