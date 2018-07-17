using System.Data;
using API_Users.Models;
using Dapper;
using System.Collections.Generic;

namespace API_Users.Repositories
{
  public class VaultKeepsRepository:DbContext
  {
    public VaultKeepsRepository(IDbConnection db):base(db)
    {}
    public VaultKeeps CreateVaultKeep(VaultKeeps newVaultKeep)
    {
      int id=_db.ExecuteScalar<int>("INSERT INTO vaultkeeps (vaultId,keepId,userId) VALUES (@VaultId,@KeepId,@UserId); SELECT LAST_INSERT_ID();",newVaultKeep);
      newVaultKeep.Id=id;
      return newVaultKeep;
    }
    public void DeleteVaultKeep(int id)
    {
      _db.Execute("DELETE FROM vaultkeeps WHERE id=@id;",new{id});
    }
    public IEnumerable<VaultKeeps> GetVaultKeepsByUserId(string userId)
    {
      return _db.Query<VaultKeeps>("SELECT * FROM vaultkeeps WHERE userId=@userId",new{userId});
    }
  }
}