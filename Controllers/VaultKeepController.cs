using System.Collections.Generic;
using API_Users.Models;
using API_Users.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API_Users.Controllers
{
  [Route("api/[controller]")]
  public class VaultKeepsController:Controller
  {
    private readonly VaultKeepsRepository db;
    public VaultKeepsController(VaultKeepsRepository repo)
    {
      db=repo;
    }
    [HttpGet("{userId}")]
    public IEnumerable<VaultKeeps> GetAllByUserId(string userId)
    {
      return db.GetVaultKeepsByUserId(userId);
    }
    [HttpPost]
    public VaultKeeps Create([FromBody]VaultKeeps newVaultKeep)
    {
      if(ModelState.IsValid)
      {
        return db.CreateVaultKeep(newVaultKeep);
      }
      return null;
    }
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      db.DeleteVaultKeep(id);
    }
    [HttpPut("{id}")]
    public void EditVaultKeep()
    {}
  }
}