using System.Data;
using API_Users.Models;
using Dapper;
using System.Collections.Generic;

namespace API_Users.Repositories
{
  public class VaultKeepsRepository : DbContext
  {
    public VaultKeepsRepository(IDbConnection db):base(db)
    {

    }

// CREATE VAULTKEEP
    public VaultKeeps CreateVaultKeep(VaultKeeps newVaultKeep)
    {
      int id=_db.ExecuteScalar<int>(@"
      INSERT INTO vaultkeeps (vaultId, keepId, userId) 
      VALUES (@VaultId,@KeepId,@UserId); 
      SELECT LAST_INSERT_ID();
      ",newVaultKeep);
      newVaultKeep.Id=id;
      return newVaultKeep;
    }


// GET BY USER ID    
    public IEnumerable<VaultKeeps> GetVaultKeepsByUserId(string userId)
    {
      return _db.Query<VaultKeeps>("SELECT * FROM vaultkeeps WHERE userId=@userId", new{userId});
    }

    // Edit
    public VaultKeeps EditVaultKeep(int id, VaultKeeps VaultKeep)
    {
      VaultKeep.Id = id;
      VaultKeep.Added++;
      var i = _db.Execute(@"
                UPDATE vaultkeeps SET
                    vaultId = @VaultId,
                    keepId = @KeepId,
                    added = @Added
                WHERE id = @Id
            ", VaultKeep);
      if (i > 0)
      {
        return VaultKeep;
      }
      return null;
    }

 public bool DeleteVaultKeep (int id)
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

//DELETE BY ID
    // public void DeleteVaultKeep(int id)
    // {
    //   _db.Execute("DELETE FROM vaultkeeps WHERE id=@id;", new{id});
    // }

  }
}