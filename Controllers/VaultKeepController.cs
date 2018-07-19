using System.Collections.Generic;
using API_Users.Models;
using API_Users.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API_Users.Controllers
{
    [Route("api/[controller]")]
    public class VaultKeepsController : Controller
    {
        private readonly VaultKeepsRepository db;
        public VaultKeepsController(VaultKeepsRepository repo)
        {
            db = repo;
        }

        // [HttpGet]
        // public IEnumerable<VaultKeeps> GetAllByUserId()
        // {
        //     var userId = HttpContext.User.Identity.Name;
        //     return db.GetVaultKeepsByUserId(userId);
        // }

      // [Authorize] <-- need to set this up to use it. Security/Permission.


        [HttpGet("{vaultId}")]
        public IEnumerable<Keep> GetKeepsByVaultId(string vaultId)
        {
            return db.GetKeepByVaultId(vaultId);
        }

        [HttpPost]
        public VaultKeeps Create([FromBody]VaultKeeps newVaultKeep)
        {
            if (ModelState.IsValid)
            {
                var user = HttpContext.User;
                newVaultKeep.UserId = user.Identity.Name;
                return db.CreateVaultKeep(newVaultKeep);
            }
            return null;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            db.DeleteVaultKeep(id);
        }

    }
}