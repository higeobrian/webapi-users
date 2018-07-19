using System.Data;
using API_Users.Models;
using Dapper;
using System.Collections.Generic;

namespace API_Users.Repositories
{
    public class VaultKeepsRepository : DbContext
    {
        public VaultKeepsRepository(IDbConnection db) : base(db)
        {

        }

        // CREATE VAULTKEEP
        public VaultKeeps CreateVaultKeep(VaultKeeps newVaultKeep)
        {
            int id = _db.ExecuteScalar<int>(@"
      INSERT INTO vaultkeeps (vaultId, keepId, userId)  
      VALUES (@VaultId,@KeepId,@UserId); 
      SELECT LAST_INSERT_ID();
      ", newVaultKeep);
            newVaultKeep.Id = id;
            return newVaultKeep;
        }

        // // GET BY KEEP ID
        // public IEnumerable<VaultKeeps> GetbyKeepId(int id)
        // {
        //     return _db.Query<VaultKeeps>("SELECT * FROM vaultkeeps WHERE keepId = @id;", new { id });
        // }

        // // GET BY VAULT ID
        // public IEnumerable<VaultKeeps> GetbyVaultId(int id)
        // {
        //     return _db.Query<VaultKeeps>("SELECT * FROM vaultkeeps WHERE vaultId = @id;", new { id });
        // }

        // GET BY USER ID    
        public IEnumerable<VaultKeeps> GetVaultKeepsByUserId(string userId)
        {
            return _db.Query<VaultKeeps>("SELECT * FROM vaultkeeps WHERE userId=@userId", new { userId });
        }

        // Edit
        public VaultKeeps EditVaultKeep(int id, VaultKeeps VaultKeep)
        {
            VaultKeep.Id = id;
            var i = _db.Execute(@"
                UPDATE vaultkeeps SET
                    vaultId = @VaultId,
                    keepId = @KeepId
                WHERE id = @Id
            ", VaultKeep);
            if (i > 0)
            {
                return VaultKeep;
            }
            return null;
        }

        public bool DeleteVaultKeep(int id)
        {
            var i = _db.Execute(@"
      DELETE FROM vaultKeeps
      WHERE id = @id;
      LIMIT 1;
      ", new { id });
            if (i > 0)
            {
                return true;
            }
            return false;
        }

        // GET BY ID
        public IEnumerable<Keep> GetKeepByVaultId(string vaultId)
        {
            return _db.Query<Keep>(@"SELECT * FROM vaultkeeps vk
INNER JOIN keeps k ON k.id = vk.keepId 
WHERE (vaultId = @vaultId)", new { vaultId});

        //DELETE BY ID
        // public void DeleteVaultKeep(int id)
        // {
        //   _db.Execute("DELETE FROM vaultkeeps WHERE id=@id;", new{id});
        // }

        }
    }
}